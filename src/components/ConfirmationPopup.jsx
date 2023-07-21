import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ card, isOpen, onDeleteCard, isLoading }) {
  function handleSubmit(event) {
    event.preventDefault();
    onDeleteCard(card);
  }
  
  return (
    <PopupWithForm
      name="confirmDeleteForm"
      title="Вы уверены?"
      submitText={isLoading ?  "Удаление..." : "Да"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmationPopup;