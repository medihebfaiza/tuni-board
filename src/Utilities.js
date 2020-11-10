import gga from './assets/gga.png';
import balti from './assets/balti.png';

function format(number) {
  if (number != 0) {
    return new Intl.NumberFormat('fr-FR').format(number);
  }
  else {
    return 'Private';
  }
}

function Spinner() {
  return (    
    <div className="vh-100 container text-center d-flex justify-content-center align-items-center">
      <div className="lds-dual-ring"></div>
    </div>
  )
}

function YoutubeIcon() { 
  return (<svg width="1em" height="1em" viewBox="0 0 24 30" className="" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.499 6.203a3.008 3.008 0 00-2.089-2.089c-1.87-.501-9.4-.501-9.4-.501s-7.509-.01-9.399.501a3.008 3.008 0 00-2.088 2.09A31.258 31.26 0 000 12.01a31.258 31.26 0 00.523 5.785 3.008 3.008 0 002.088 2.089c1.869.502 9.4.502 9.4.502s7.508 0 9.399-.502a3.008 3.008 0 002.089-2.09 31.258 31.26 0 00.5-5.784 31.258 31.26 0 00-.5-5.808zm-13.891 9.4V8.407l6.266 3.604z"></path>
  </svg>)
}

function EyeIcon() { 
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 20" className="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
      <path fillRule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
    </svg>
  )
}

export { format, Spinner, YoutubeIcon, EyeIcon, gga, balti };