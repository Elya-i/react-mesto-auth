import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ card, isOpen, onClose, onDeleteCard, isLoading }) {
  function handleSubmit(event) {
    event.preventDefault();
    onDeleteCard(card);
    onClose(); 
  }
  
  return (
    <PopupWithForm
      name="confirmDeleteForm"
      title="Вы уверены?"
      submitText={isLoading ?  "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmationPopup;