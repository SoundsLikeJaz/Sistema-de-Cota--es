import {useEffect, useState} from "react";
import {CreateAccountForm, LoginForm} from "../components";

const Entrar = () => {

    const [cadastrado, setCadastrado] = useState(true);

    function handleClick() {
        setCadastrado(!cadastrado);
    }

    return(
        <div className="entrar">
            {cadastrado
                ?
                (
                    <div>
                        <LoginForm/>
                        <p>Não possui uma conta? <span onClick={handleClick}>Cadastre-se!</span></p>
                    </div>
                )
                :
                (
                    <div>
                        <CreateAccountForm/>
                        <p>Já possui uma conta? <span onClick={handleClick}>Faça login!</span></p>
                    </div>
                )
            }
        </div>
    );
}

export default Entrar;