import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import SideBar from './components/sideBar/SideBar';
import Layout from './layout/Layout';

function App() {
    return (
        <div className="app">
            <SideBar />
            <Router />
        </div>
    );
}

function Router() {
    const CompanyList = lazy(() =>
        import('./components/company/list/CompanyList')
    );

    const CompanyDetail = lazy(() =>
        import('./components/company/detail/CompanyDetail')
    );

    function WildCardRedirect() {
        return <Navigate to="/company/list" />;
    }

    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Layout>
                    <Routes>
                        <Route path="/company/list" element={<CompanyList />} />
                        <Route
                            path="/company/detail/:companyId"
                            element={<CompanyDetail />}
                        />
                        <Route path="/user" element={<>dummy</>} />
                        <Route path="*" element={<WildCardRedirect />} />
                    </Routes>
                </Layout>
            </Suspense>
        </BrowserRouter>
    );
}

function Loading() {
    return <>loading...</>;
}

export default App;
