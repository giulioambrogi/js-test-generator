import { toast } from 'react-toastify';

const defaultOpts = {
  position: "top-right",
  autoClose: 4500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

export const show = (text, options = {}) =>{

  toast.success( text, {...defaultOpts, ...options} );

}
