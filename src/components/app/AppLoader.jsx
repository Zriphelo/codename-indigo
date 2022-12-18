import { ProviderWrapper as WalletProviderWrapper } from '../../context/WalletContext';
import App from './App'

const AppLoader = () => {
    return (
        <WalletProviderWrapper>
            <App/>
        </WalletProviderWrapper>
    )
}

export default AppLoader