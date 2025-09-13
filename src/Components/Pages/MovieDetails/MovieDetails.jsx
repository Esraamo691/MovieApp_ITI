// import { motion } from "motion/react";
import style from  "../MovieDetails/movie.module.css"
import { Bounce, toast, ToastContainer } from "react-toastify";
export default function MovieDetails() {
  // const notify = () => toast("wow is easy !");
const notify=()=>  toast.success("movie added successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    className:style.myToast
  });
  return (
    <>
      {/* <motion.div animate={{ rotate: 360 }} className=" bg-black text-white"> jsdjksfkjfkjdf</motion.div> */}
      <button onClick={notify}>click</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}
