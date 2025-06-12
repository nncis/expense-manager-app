type ConfirmationDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
};

export default function ConfirmationDialog({message, onConfirm, onCancel, isOpen}: ConfirmationDialogProps){

   if (!isOpen) return null;

  return (
    <div>
      <p>{message}</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  )
}