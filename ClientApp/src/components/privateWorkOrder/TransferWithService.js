
import React, { useEffect, useRef, useState } from 'react';
import { DataGrid, ScrollView } from 'devextreme-react';
import { Popup } from 'devextreme-react/popup';
import Form, { GroupItem, SimpleItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import notify from 'devextreme/ui/notify';
import { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid } from 'devextreme-react/data-grid';
import { dialogPrivateTransferWithService } from '../../store/privateTransferWithService/privateTransferWithServiceDialogReducer';
import { Button } from 'devextreme-react';
import { areaRestrict, editorOptionsSelect } from '../../data/app';
import { createStoreLocal } from '../../utils/proxy';
import http from '../../utils/http';
import uri from '../../utils/uri';
import useProducts from '../../hooks/useProducts';
import ProductDDBComponent from '../dropdown/ProductDDBComponent';
import { onCellPrepared } from '../../utils/common';
import gridsHelper from '../../utils/gridsHelper';

const TransferWithService = () => {

    const { open, id } = useSelector(store => store.privateTransferWithService);

    const [saving, setSaving] = useState({
        text: 'Transferir',
        loading : false
    });
    const [sendTest, setSendTest] = useState({});
    const [areaId, setAreaId] = useState(0);    
    const [details, setDetails] = useState([]);    
    const [services, setServices] = useState([]);

    const loadServices = (areaId) => {
        http(`services/area/${areaId}/get`).asGet({ active: true }).then(resp => setServices(resp))
    }

    const dispatch = useDispatch();
    const onHiding = () => dispatch(dialogPrivateTransferWithService({ open: false, id: 0 }));

    let refForm = useRef();
    let refGrid = useRef();

    const onToolbarPreparing = gridsHelper(refGrid, { text : 'Agregar examenes', icon:'plus' });   

    const transferir = () => {

        var result = refForm.current.instance.validate();
       
        if (result.isValid) {
            setSaving({text:'Transfiriendo...', loading: true})
            http(`followsprivate/post/withservice/admission/${id}/areaTarget/${areaRestrict.laboratorio}`)
            .asPost({ ...sendTest, PrivateSendTestDetails : details }).then(resp => {
                notify("Se realizo la transferencia con éxito");
                setSaving({text:'Transferir', loading: false});
                refForm.current.instance.resetValues();
                onHiding();
            }).catch(err => {
                setSaving({text:'Transferir', loading: false});
                notify(err, 'error')
            })

        }

    }   
  
    useEffect(() => {
        setAreaId(areaRestrict.laboratorio);
        setDetails([]);  
        loadServices(areaRestrict.laboratorio);    
    }, [open]);


    const title = 'Transferir privado a laboratorio';

    return (
        <div>
            <Popup
                width={700}
                height={570}
                onHiding={onHiding}
                title={title}
                visible={open}
            >
                <ScrollView>

               
                <Form formData={sendTest} ref={refForm}>                   
                    <SimpleItem dataField="doctorId" colSpan={2} editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStoreLocal({name: 'Doctor', active : true}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Doctor" />
                            <RequiredRule message="Seleecione el medico" />
                        </SimpleItem>                   
                    <GroupItem>
                    <DataGrid id="gridContainer"
                         ref={refGrid}
                        dataSource={details}
                        selection={{ mode: 'single' }}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        onToolbarPreparing={onToolbarPreparing}                       
                    >
                            <Column dataField="Serviceid" caption="Procedimiento">
                            <Lookup
                                disabled={true}
                                dataSource={services}
                                valueExpr="id" displayExpr="name"
                            />
                            <RequiredRule message="Seleecione el medico" />
                        </Column>                       
                        <Editing
                            mode="cell"
                            selectTextOnEditStart={true}
                            allowDeleting={true}
                            allowUpdating={true}
                            useIcons={true}
                        ></Editing>
                    </DataGrid>
                    </GroupItem>
                </Form>
                <br />
                <Button className="m0" type="default" text={saving.text} onClick={transferir} width="100%" disabled={saving.loading} ></Button>
                </ScrollView>
            </Popup>
        </div>
    );
}

export default TransferWithService;
