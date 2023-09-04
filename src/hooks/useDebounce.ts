const useDebounce = () => {
  const debounce = (func: any, delay = 300) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  return debounce;
};

export default useDebounce;
