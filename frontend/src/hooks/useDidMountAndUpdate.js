import { useEffect } from 'react';

const useDidMountAndUpdate = (callback, dependency) => {
  useEffect(callback, dependency);
};

export default useDidMountAndUpdate;
