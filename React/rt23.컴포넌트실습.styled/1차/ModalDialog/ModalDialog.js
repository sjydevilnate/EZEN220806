import styles from './ModalDialog.module.css';
import { createPortal } from 'react-dom';

export const ModalDialog = ({ onClose }) => {
  return createPortal(
    <div className={styles.container} onClick={onClose}>
      <div className={styles.wrapper}>
        <h2>Modal Dialog</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="모달 다이얼로그 닫기"
          className={styles.closeButton}
        >
          ✕
        </button>
      </div>
    </div>,
    document.getElementById('portals-zone')
  );
};
