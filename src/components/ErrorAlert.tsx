interface ErrorAlertProps {
  message: string;
}

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
}

export default ErrorAlert;
