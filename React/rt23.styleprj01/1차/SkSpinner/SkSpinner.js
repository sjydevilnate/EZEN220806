import styles from './SkSpinner.module.css';
import { useEffect } from 'react';
import { getPublicAsset } from '@/utils';

export function SkSpinner({ type, children, ...restProps }) {
  
  const isGrowType = type.includes('grow');
  const glowStyles = {
    width: isGrowType && 'auto',
    height: isGrowType && '100%',
  };

  let imagePath = getPublicAsset(`spinner/spinner-${type}.gif`);

  useEffect(() => {
    const loadingStartNode = document.getElementById('loading-start');
    loadingStartNode.setAttribute('role', 'alert');
    loadingStartNode.innerHTML = `<span class="a11yHidden">${
      children ?? '로딩이 시작되었습니다.'
    }</span>`;

    return () => {
      loadingStartNode.removeAttribute('role');
      loadingStartNode.innerHTML = '';

      const loadingEndNode = document.getElementById('loading-end');
      loadingEndNode.innerHTML = '<span class="a11yHidden">로딩이 종료되었습니다.</span>';

      setTimeout(() => {
        loadingEndNode.innerHTML = '';
      }, 1000);
    };
  }, [children]);

  return (
    <figure className={styles.container} {...restProps}>
      <img
        className={styles.image}
        style={glowStyles}
        src={imagePath}
        alt="서버로부터 데이터를 로딩 중입니다."
      />
    </figure>
  );
}

SkSpinner.defaultProps = {
  type: 'learn', // learn | connect | grow
};
