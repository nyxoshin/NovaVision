import { useNavigate } from "react-router-dom";

interface IErrorPage {
  errorText?: string;
}

function ErrorPage({ errorText }: IErrorPage) {
  const navigate = useNavigate();
  return (
    <div className="errorContainer">
      <div className="error">
        <h3>
          Ошибка получения данных !($
          {typeof errorText !== "undefined" && errorText})
        </h3>
        <button onClick={() => navigate(`/`)}>Вернуться на главную</button>
      </div>
    </div>
  );
}

export default ErrorPage;
