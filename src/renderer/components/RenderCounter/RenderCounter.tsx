import { useEffect, useRef } from 'react';

const useRenderCount = () => {
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });
  return renderCount.current;
};

const RenderCounter = () => {
  const renderCount = useRenderCount();
  return <pre>{JSON.stringify({ renderCount })}</pre>;
};

export default RenderCounter;
