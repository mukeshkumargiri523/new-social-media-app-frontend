import { Modal } from "@mantine/core";
import "./ShareModal.css";
import PostShare from "../postShare/PostShare";
function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <>
      <Modal
        opened={modalOpened}
        centered
        size="60%"
        onClose={() => setModalOpened(false)}
      >
        <PostShare />
      </Modal>
    </>
  );
}
export default ShareModal;
