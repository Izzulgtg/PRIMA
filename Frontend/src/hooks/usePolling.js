import { useEffect } from "react";

const usePolling = (callback, interval = 3000) => {
  useEffect(() => {
    // Jalankan sekali saat component pertama kali render
    callback();

    // Jalankan berulang sesuai interval
    const pollingId = setInterval(() => {
      callback();
    }, interval);

    // Bersihkan interval saat component unmount
    return () => {
      clearInterval(pollingId);
    };
  }, [callback, interval]);
};

export default usePolling;