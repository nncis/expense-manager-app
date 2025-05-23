'use server'

import { sql } from '@vercel/postgres';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import { Expense, GraphData, ExpenseTotalAmountPerMonth, ExpenseByDate, ExpenseAmountByDate } from './definitions';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredExpenses(query: string, currentPage: number) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  if (user) {
    try {
      const expenses = await sql`
      SELECT expenses.*
      FROM "User"
      INNER JOIN expenses
      ON "User".id = expenses.user_id 
      WHERE 
      "User".email = ${user.email} AND
      expenses.category ILIKE ${`%${query}`}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return expenses.rows
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
  } else {
    throw new Error('Not authenticated');
  }
};

export async function fetchExpensePages(query: string) {

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user) {
    if (query) {
      const count = await sql`
          SELECT COUNT(*) 
          FROM expenses
          INNER JOIN "User"
          ON expenses.user_id = "User".id
          WHERE "User".email = ${user.email} AND expenses.category = ${query}
        `;
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else {
      try {
        const count = await sql`
          SELECT COUNT(*) 
          FROM expenses
          INNER JOIN "User"
          ON expenses.user_id = "User".id
          WHERE "User".email = ${user.email}
        `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
      } catch {
        throw new Error('Not authenticated');
      }
    }
  }
};

export async function fetchExpenseById(id: string) {
  try {
    const data = await sql<Expense>`
      SELECT
        category,
        amount,
        date,
        user_id
      FROM expenses
      WHERE id = ${id}
    `;
    
    const expenses = data.rows.map((expense) => ({
      ...expense,
      // Convert amount from cents to dollars
      amount: expense.amount / 100,
    }));

    return expenses[0];

  } catch (error) {
    console.error('Database Error:', error);
  }
};

export async function getWeekExpenses(): Promise<ExpenseByDate[]> {
  
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  }

  try {
    const data = await sql<ExpenseByDate>`
      WITH last_date AS (
        SELECT 
          MAX(expenses.date) AS max_date,
          MAX(expenses.date) - EXTRACT(DOW FROM MAX(expenses.date))::INT AS last_sunday
        FROM expenses
      )
      SELECT 
        expenses.category,
        expenses.amount,
        expenses.date
      FROM "User"
      INNER JOIN expenses
      ON "User".id = expenses.user_id 
      WHERE 
       "User".email = ${user.email} AND 
        expenses.date BETWEEN (
          SELECT last_sunday FROM last_date
        ) AND (
          SELECT max_date FROM last_date
        );
    `;

    if (!data.rows.length) {
      console.warn('No expenses found for the current week');
      return [];
    }

    const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

    try {
      const weekExpenses = data.rows.map((expense) => ({
        ...expense,
        amount: convertCentsToDollars(expense.amount),
      }));
  
      return weekExpenses;
    } catch (mappingError) {
      console.error('Error while mapping data:', mappingError);
      throw new Error('Failed to process data');
    };
  } catch (dbError) {
    console.error('Database Error:', dbError);
    throw new Error('Failed to fetch week expenses');
  }
};

export async function getMonthExpenses(): Promise<ExpenseByDate[]> {
 
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  }

  try {
    const data = await sql<ExpenseByDate>`
      WITH last_date AS (
        SELECT 
        MAX(expenses.date) AS max_date,
        DATE_TRUNC('month', MAX(expenses.date)) AS first_day_of_month
        FROM expenses
      )
      SELECT 
        expenses.category,
        expenses.amount,
        expenses.date
      FROM "User"
      INNER JOIN expenses
      ON "User".id = expenses.user_id
      WHERE 
        "User".email = ${user.email} AND 
        expenses.date BETWEEN (
      SELECT first_day_of_month FROM last_date
      ) AND (
      SELECT max_date FROM last_date
      );
    `

    const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

    try {
      const weekExpenses = data.rows.map((expense) => ({
        ...expense,
        amount: convertCentsToDollars(expense.amount),
      }));
  
      return weekExpenses;
    } catch (mappingError) {
      console.error('Error while mapping data:', mappingError);
      throw new Error('Failed to process data');
    };

  } catch (dbError) {
    console.error('Database Error:', dbError);
    throw new Error('Failed to fetch week expenses');
  }
};


// export async function getAnnualExpenses(year: string): Promise<ExpenseTotalAmountPerMonth[]> {
 
//   const session = await getServerSession(authOptions);
//   const user = session?.user;

//   if (!user) {
//     console.error('Authentication Error: User is not authenticated');
//     throw new Error('User is not authenticated');
//   }

//   try {
//     const data = await sql<ExpenseTotalAmountPerMonth>`
//       SELECT 
//         TO_CHAR(expenses.date, 'Mon') AS month, 
//         SUM(expenses.amount) AS total
//       FROM "User"
//       INNER JOIN expenses ON "User".id = expenses.user_id
//       WHERE 
//         "User".email = ${user.email} 
//         AND EXTRACT(YEAR FROM expenses.date) = ${year}
//       GROUP BY month, EXTRACT(MONTH FROM expenses.date)
//       ORDER BY EXTRACT(MONTH FROM expenses.date);
//     `

//     if (!data.rows.length) {
//       console.warn('No expenses found for the current week');
//       return [];
//     }

//     const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;
    
//     try {
//       const annualExpenses = data.rows.map((expense) => ({
//         ...expense,
//         total: convertCentsToDollars(expense.total),
//       }));
  
//       return annualExpenses;
//     } catch (mappingError) {
//       console.error('Error while mapping data:', mappingError);
//       throw new Error('Failed to process data');
//     };

//   } catch(dbError){
//     console.error('Database Error:', dbError);
//     throw new Error('Failed to fetch expenses years');
//   }
// };


export async function getFirstAndLastExpensesDates() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  };

  try {
    const data = await sql`
      SELECT 
        MIN(expenses.date) AS first_expense,
        MAX(expenses.date) AS last_expense
      FROM "User"
      INNER JOIN expenses ON "User".id = expenses.user_id
      WHERE "User".email = ${user.email} 
      `
      if (!data.rows.length) {
        console.warn('No expenses found');
        return [];
      }

      const row = data.rows[0]
      const formatted = [
        row.first_expense,
        row.last_expense
      ]

    return formatted
  }catch(error){
    console.error('Error getting first and last expenses', error);
    throw new Error('Failed to process data');
  }
};

export async function getExpensesByWeek(date: string | undefined){
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  };

  const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

  try {
    const data = await sql<ExpenseAmountByDate>`
        SELECT 
          expenses.category,
          SUM(expenses.amount) AS amount
        FROM "User"
        INNER JOIN expenses ON "User".id = expenses.user_id
        WHERE "User".email = ${user.email}
          AND expenses.date BETWEEN ${date}::date AND (${date}::date + INTERVAL '6 days')
        GROUP BY expenses.category
      `

      if (!data.rows.length) {
        console.warn('No expenses found for the current week');
        return [];
      }

      try {
        const weekExpenses = data.rows.map((expense) => ({
          ...expense,
          amount: convertCentsToDollars(expense.amount),
        }));
    
        return weekExpenses;
      } catch (mappingError) {
        console.error('Error while mapping data:', mappingError);
        throw new Error('Failed to process data');
      };

  } catch(error){
    console.error('Error fetching expenses by week', error);
    throw new Error('Failed to process data');
  }
};

export async function getExpenseByMonth(date: string | undefined){
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  };

  const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

  try {
    const data = await sql<ExpenseAmountByDate>`
      SELECT
        expenses.category,
        SUM(expenses.amount) AS amount
      FROM "User"
      INNER JOIN expenses ON "User".id = expenses.user_id
      WHERE "User".email = ${user.email}
        AND expenses.date >= (${date} || '-01')::date
        AND expenses.date < ((${date} || '-01')::date + INTERVAL '1 month')
      GROUP BY expenses.category
    `
    if (!data.rows.length) {
      console.warn('No expenses found for the current week');
      return [];
    }

    try {
      const montExpenses = data.rows.map((expense) => ({
        ...expense,
        amount: convertCentsToDollars(expense.amount),
      }));
      return montExpenses;
    } catch (mappingError) {
      console.error('Error while mapping data:', mappingError);
      throw new Error('Failed to process data');
    };
    
  } catch(error){
    console.error('Error fetching expenses by month', error);
    throw new Error('Failed to process data');
  }
};

export async function getExpenseTotalAmountAnnualy(date: string | undefined) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  };

  try {
    const data = await sql<GraphData>`
      SELECT
        TO_CHAR(date, 'Mon') AS date,
        SUM(amount) AS total
      FROM "User"
      INNER JOIN expenses ON "User".id = expenses.user_id
      WHERE "User".email = ${user.email}
        AND EXTRACT(YEAR FROM date) = CAST(LEFT(${date}, 4) AS INTEGER)
      GROUP BY TO_CHAR(date, 'Mon'), EXTRACT(MONTH FROM date)
      ORDER BY EXTRACT(MONTH FROM date)
    `
    if (!data.rows.length) {
      console.warn('No expenses found for the current year');
      return [];
    }

    const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

    try {

      const annualExpenses = data.rows.map((expense) => ({
        ...expense,
        total: convertCentsToDollars(expense.total),
      }));
  
      return annualExpenses;
    } catch (mappingError) {
      console.error('Error while mapping data:', mappingError);
      throw new Error('Failed to process data');
    };

  } catch(error){
    console.error('Error fetching expenses by year', error);
    throw new Error('Failed to process data');
  }
};

export async function getExpenseTotalAmountWeekly(date: string | undefined) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  };

  try{
    const data = await sql<GraphData>`
      SELECT 
        TO_CHAR(date, 'Dy') AS date,
        SUM(amount) AS total
      FROM "User"
      INNER JOIN expenses ON "User".id = expenses.user_id
      WHERE "User".email = ${user.email}
        AND date BETWEEN ${date}::date AND (${date}::date + INTERVAL '6 days')
      GROUP BY TO_CHAR(date, 'Dy'), EXTRACT(DOW FROM date)
      ORDER BY EXTRACT(DOW FROM date);
    `

    if (!data.rows.length) {
      console.warn('No expenses found for the current year');
      return [];
    }

    const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

    try {

      const weeklyExpenses = data.rows.map((expense) => ({
        ...expense,
        total: convertCentsToDollars(expense.total),
      }));
  
      return weeklyExpenses;
    } catch (mappingError) {
      console.error('Error while mapping data:', mappingError);
      throw new Error('Failed to process data');
    };

  }catch(error){
    console.error('Error fetching total amount weekly', error);
    throw new Error('Failed to process data');
  }
};

export async function getTotalAmountWeek(date: string | undefined) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  };

  try {
    const data = await sql`
      SELECT 
        SUM(CASE 
              WHEN date BETWEEN (${date}::date - INTERVAL '7 days') AND (${date}::date - INTERVAL '1 day')
              THEN amount
              ELSE 0
            END) AS "lastWeek",
        SUM(CASE 
              WHEN date BETWEEN ${date}::date AND (${date}::date + INTERVAL '6 days')
              THEN amount
              ELSE 0
            END) AS "currentWeek"
      FROM "User"
      INNER JOIN expenses ON "User".id = expenses.user_id
      WHERE "User".email = ${user.email};
    `

      if (!data.rows.length) {
      console.warn('No total amount found for the current week');
      return [];
    }
    const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

    try {
      const weeklyExpenses = {
        lastAmount: convertCentsToDollars(data.rows[0].lastWeek),
        currentAmount: convertCentsToDollars(data.rows[0].currentWeek)
      }
      return weeklyExpenses;
    } catch (mappingError) {
      console.error('Error while mapping data:', mappingError);
      throw new Error('Failed to process data');
    };

  } catch(error){
    console.error('Error fetching total amount weekly', error);
    throw new Error('Failed to process data');
  }

}

export async function getTotalAmountPreviousCurrentMonth(date: string | undefined) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error('Authentication Error: User is not authenticated');
    throw new Error('User is not authenticated');
  };
  
  try {
    const data = await sql`
      SELECT 
        SUM(CASE 
              WHEN date BETWEEN (DATE_TRUNC('month', (${date} || '-01')::date) - INTERVAL '1 month') 
                          AND (DATE_TRUNC('month', (${date} || '-01')::date) - INTERVAL '1 day')
              THEN amount
              ELSE 0
            END) AS "lastMonth",
        SUM(CASE 
              WHEN date BETWEEN DATE_TRUNC('month', (${date} || '-01')::date)
                          AND (DATE_TRUNC('month', (${date} || '-01')::date) + INTERVAL '1 month - 1 day')
              THEN amount
              ELSE 0
            END) AS "currentMonth"
      FROM "User"
      INNER JOIN expenses ON "User".id = expenses.user_id
      WHERE "User".email = ${user.email};
    `

      if (!data.rows.length) {
      console.warn('No total amount found for the current month');
      return [];
    }
    const convertCentsToDollars = (amountInCents: number) => amountInCents / 100;

    try {
      const weeklyExpenses = {
        lastAmount: convertCentsToDollars(data.rows[0].lastMonth),
        currentAmount: convertCentsToDollars(data.rows[0].currentMonth)
      }
      return weeklyExpenses;
    } catch (mappingError) {
      console.error('Error while mapping data:', mappingError);
      throw new Error('Failed to process data');
    };

  } catch(error){
    console.error('Error fetching total amount month', error);
    throw new Error('Failed to process data');
  }

}
