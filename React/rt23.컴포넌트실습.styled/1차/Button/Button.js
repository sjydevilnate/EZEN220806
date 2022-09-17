import styles from './Button.module.css';

import { forwardRef } from 'react';

// 고차 컴포넌트
// React.forwardRef(Component) => Ehanced Component
// 컴포넌트(Button) → 고차 함수(forwarding `ref`) → 향상된 컴포넌트(ref 전달 받아서 설정)

function ButtonOriginal(
  {
    type = 'button',
    onOpen,
    buttonProps,
    children,
    isShowDummyText = true,
    ...restProps
  },
  ref
) {
  return (
    <div className={styles.wrapper} {...restProps}>
      <button ref={ref} type={type} onClick={onOpen} {...buttonProps}>
        {children}
      </button>
      {isShowDummyText && <span>dummy text</span>}
    </div>
  );
}

export const Button = forwardRef(ButtonOriginal);
