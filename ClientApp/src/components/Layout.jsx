// react
import React from 'react';

// third-party
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './home/HomePage';

// application
import Footer from './footer';
import Header from './header';
import MobileMenu from './mobile/MobileMenu';

import catalogos, { typeTraslate } from '../data/catalogos';
import Catalogo from './shared/Catalogos';
import { _path } from '../data/headerNavigation';
import MobileHeader from './mobile/MobileHeader';
import PrivateRoute from './header/PrivateRouter';
import Percapita from '../views/percapita';
import Admisiones from '../views/admision';
import Nuevo from '../views/admision/Nuevo';
import Beneficiarios from '../views/beneficiarios';
import Follows from '../views/follows';
import FollowsPrivate from '../views/followsPrivate';
import Subsidies from '../views/subsidies';
import Doctores from '../views/doctores';
import DoctoresById from '../views/doctores/DoctoresById';
import Appointments from '../views/appointments';
import * as AppointmentsNuevo from '../views/appointments/Nuevo';
import * as NuevoPuestoMedico from '../views/puestomedicos/Nuevo';
import Paciente from './search/Paciente';
import Bills, { BillNuevo } from '../views/bills';
import Privados from '../views/privados';
import Procedimientos from '../views/procedimientos/Procedimientos';
import AreaProcedimientos from '../views/procedimientos/AreaProcedimientos';
import Parameters from '../views/condig/Parameters';
import OutPutProducts from '../views/movimientos/outPutProducts';
import InPutProducts from '../views/movimientos/inPutProducts';
import Products from '../views/products';
import Users from '../views/users';
import Roles from '../views/roles';
import Resources from '../views/resources';
import Rates from '../views/rates';
import initProduct from '../views/movimientos/initProducts/initProduct';
import initPurchases from '../views/movimientos/initProducts/initPurchases';
import Providers from '../views/providers/Providers';
import Traslates from '../views/movimientos/traslates';
import Kardex from '../views/reports/kardex';
import Customers from '../views/customers';
import Existencias from '../views/reports/stocks';
import ProcedimientoDetalle from '../views/procedimientos/ProcedimientoDetalle';
import initAdjustments from '../views/movimientos/initProducts/initAdjustments';
import Stock from '../views/reports/stocks/Stock';
import Navig from './navigator/Navig';
import NuevoQuickly from '../views/bills/NuevoQuickly';
import GroupProducts from '../views/groupProducts/GroupProducts';
import GroupDays from '../views/groupProducts/GroupDays';
import GroupPrivateCustomers from '../views/groupProducts/GroupPrivateCustomers';
import HemoLog from '../views/groupProducts/HemoLog';
import GroupsCatalos from '../views/groups/GroupsCatalos';
import Areas from '../views/areas/Areas';
import PuetosMedicos from '../views/puestomedicos/PuetosMedicos';
import AdmisionesHoy from '../views/admision/AdmisionesHoy';
import ProcedimientoEstandar from '../views/procedimientos/ProcedimientoEstandar';
import ExpedienteClinico from '../views/expediente/ExpedienteClinico';
import ExpedienteClinicoPrivado from '../views/expediente/ExpedienteClinicoPrivado';
import AppConfig from '../views/app/AppConfig';
import BeneficiariosAll from '../views/beneficiarios/BeneficiariosAll';
import Autorizes from '../views/movimientos/traslates/Autorizes';
import Nefrologia from '../views/reports/hemo/Nefrologia';
import Purchases from '../views/purchases';
import DownloadProducts from '../views/reports/stocks/DownloadProducts';
import DealySales from '../views/reports/stocks/DealySales';
import DealySalesDetail from '../views/reports/stocks/DealySalesDetail';
import CountPhisycal from '../views/reports/stocks/CountPhisycal';
import Comprobante from '../views/reports/stocks/Comprobante';
import CountPhisycalValue from '../views/reports/stocks/CountPhisycalValue';

function Layout(props) {
    const { headerLayout } = props;

    const PrintCatalogos = catalogos.map(c => {
        return  <PrivateRoute key={c.name} exact path={`${_path[String(headerLayout).toUpperCase()]}/${c.name}`} render={(props) => (
                    <Catalogo {...props} {...c} />
        )} />
    });

    let prop = (path, component) => ({exact:true, path : `${_path.CLINICA}/${path}`, component });

    const builRoute = (path, component) => <PrivateRoute key={path} {...prop(path, component) } /> ;

    const routes = [
        builRoute('app', AppConfig)
        ,builRoute('', HomePage)
        ,builRoute('admisiones', Admisiones)
        ,builRoute('admisiones-hoy', AdmisionesHoy)
        ,builRoute('admisiones/nuevo', Nuevo)
        ,builRoute('config/percapitas', Percapita)
        ,builRoute('citas', Appointments)
        ,builRoute('citas/nuevo', AppointmentsNuevo.default)
        ,builRoute('asegurados/activos', Customers)
        ,builRoute('beneficiarios', Beneficiarios)
        ,builRoute('beneficiariosall', BeneficiariosAll)
        ,builRoute('privados', Privados)
        ,builRoute('servicios', Follows)
        ,builRoute('servicios-privados', FollowsPrivate)
        ,builRoute('subsidios', Subsidies)
        ,builRoute('doctores', Doctores)
        ,builRoute('doctores/horarios', DoctoresById)
        ,builRoute('paciente/:id', Paciente)
        ,builRoute('facturas', Bills)
        ,builRoute('facturas/nuevo', BillNuevo)
        ,builRoute('facturas/nuevo-quickly', NuevoQuickly)
        ,builRoute('procedimientos', Procedimientos)
        ,builRoute('procedimientos/estandar', ProcedimientoEstandar)
        ,builRoute('area/procedimientos', AreaProcedimientos)
        ,builRoute('procedimientos/detalle', ProcedimientoDetalle)
        ,builRoute('config/parameters', Parameters)
        ,builRoute('movimientos/entradas', initAdjustments)
        ,builRoute('movimientos/salidas', OutPutProducts)
        ,builRoute('movimientos/entradas', InPutProducts)
        ,builRoute('movimientos/inv-inicial', initProduct)
        ,builRoute('movimientos/compras', Purchases)
        ,builRoute('productos', Products)
        ,builRoute('tasa-de-cambio', Rates)
        ,builRoute('proveedores', Providers)
        ,builRoute('usuarios', Users)
        ,builRoute('roles', Roles)
        ,builRoute('permisos', Resources)
        ,builRoute('inventario/reportes/kardex', Kardex)
        ,builRoute('inventario/reportes/existencias', Existencias)
        ,builRoute('inventario/reportes/stock', Stock)
        ,builRoute('inventario/reportes/donwload', DownloadProducts)
        ,builRoute('inventario/reportes/counting', CountPhisycal)
        ,builRoute('inventario/reportes/counting-value', CountPhisycalValue)
        ,builRoute('inventario/reportes/comprobantes', Comprobante)
        ,builRoute('navig', Navig)
        ,builRoute('grupos', GroupsCatalos)
        ,builRoute('grupo-medicamentos', GroupProducts)
        ,builRoute('grupo-calendario', GroupDays)
        ,builRoute('grupo-hemo', GroupPrivateCustomers)
        ,builRoute('hemo-products', HemoLog)
        ,builRoute('areas', Areas)
        ,builRoute('puestos-medicos', PuetosMedicos)
        ,builRoute('puestos-medicos/nuevo', NuevoPuestoMedico.default)
        ,builRoute('servicios/expediente', ExpedienteClinico)
        ,builRoute('servicios/expediente-privado', ExpedienteClinicoPrivado)
        
        ,builRoute('facturas/nefrologia', Nefrologia)
        ,builRoute('facturas/daily', DealySales)
        ,builRoute('facturas/daily/details', DealySalesDetail)



        
    ];
    return (
        <React.Fragment>          

            <ToastContainer autoClose={5000} hideProgressBar />

            <MobileMenu layout={headerLayout}/>

            <div className="site">
                {/* <header className="site__header d-lg-none">
                    <MobileHeader />
                </header> */}

                <header className="site__header d-lg-block d-none">
                    <Header layout={headerLayout} />
                </header>

                <div className="site__body">
                
                    <Switch>
                        {PrintCatalogos}    
                        {routes}   
                        <PrivateRoute key={1} exact path={`${_path.CLINICA}/movimientos/traslados`} render={props => <Traslates {...props} type={typeTraslate.create} /> } />                         
                        <PrivateRoute key={2} exact path={`${_path.CLINICA}/movimientos/despacho`} render={props => <Traslates {...props} type={typeTraslate.update}/> } />                         
                        <PrivateRoute key={3} exact path={`${_path.CLINICA}/movimientos/autorizar-despacho`} render={props => <Autorizes {...props} type={typeTraslate.update}/> } />                         
                    </Switch>
                </div>

                <footer className="site__footer">
                    <Footer showInfo={true} />
                </footer>
            </div>
        </React.Fragment>

    )
}

export default Layout;

