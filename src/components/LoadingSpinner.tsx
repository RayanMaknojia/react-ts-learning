// A component with no props at all is still a component — it's just a
// function that returns JSX. Useful for any bit of markup you'd
// otherwise copy-paste in multiple places.
function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
