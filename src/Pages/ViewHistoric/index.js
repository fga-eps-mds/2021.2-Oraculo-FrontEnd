import ForwardSector from "../../Components/ForwardSector";
import React, {  useState , useEffect} from "react";
import { useParams } from "react-router";
import { getRecordHistory , getUserByEmail} from "../../Services/Axios/processService";
import toast from "react-hot-toast";
import {
    getDepartments,
    getInfoUser,
} from "../../Services/Axios/profileService";
import HeaderWithButtons from "../../Components/HeaderWithButtons";

function ViewHistoric() {
    const [forwardHistory, setForwardHistory] = useState([]);
    const  {id}  = useParams();

    useEffect(() => {
        // deve salvar historico no forwardHistory 
        async function saveHistoryData(){
            const responseHistory = await getRecordHistory(toast, id);
            const arrayForwardHistory = await Promise.all(
                responseHistory.map((history) => organizeHistory(history))
            );
            setForwardHistory(arrayForwardHistory);
        }
        
        // deve organizar um historico para seu respectivo formato
        async function organizeHistory(history){
            var newForwardHistory = []
            const email = history.forwarded_by;
            
            if(email != null){
                const originSecID = history.origin_id;
                const destinationID = history.destination_id;
                const allDepartments = await getDepartments();
                console.log(allDepartments)

                const setor = allDepartments.filter((indice) => {
                    return indice.id === destinationID;
                });
                const originSection = allDepartments.filter((indice) => {
                    return indice.id === originSecID;
                });

                const user = await getUserByEmail(email);
                
                
                newForwardHistory = {
                    setor: setor[0].name, 
                    setorOrigin:  originSection[0].name, 
                    date: formatedDate(history.createdAt),
                    dateForward: formatedDate(history.updatedAt),
                    name: user.name,
                };
                
            }else if (history.closed_by != null) {
                const dateDoneReg = formatedDate(history.closed_at);
                const infoUserDone = await getUserByEmail(history.closed_by);
                    newForwardHistory = {
                    setor: " ",
                    setorOrigin: history.origin_name,
                    defaultText: "Registro Concluído",
                    date: dateDoneReg,
                    dateForward: " ",
                    name: infoUserDone.name,
                    };
            } else if (history.reopened_by != null) {
                const dateReopenReg = formatedDate(history.reopened_at);
                const infoUserDone = await getUserByEmail(history.reopened_by);
                    newForwardHistory = {
                    setor: " ",
                    setorOrigin: " ",
                    defaultText: "Registro reaberto",
                    reason: "Motivo:",
                    reasonText: history.reason,
                    date: dateReopenReg,
                    dateForward: " ",
                    name: infoUserDone.name,
                };
            } else {
                const infoUser = await getUserByEmail(history.created_by);
                const createDate = formatedDate(history.created_at);
                newForwardHistory = {
                    setor: " ",
                    setorOrigin: history.origin_name,
                    defaultText: "Registro criado em: ",
                    date: createDate,
                    dateForward: " ",
                    name: infoUser.name,
                };
            }
            return newForwardHistory;
        };
        saveHistoryData();
    });
    // data formatada
    const formatedDate = (infoDate) => {
        const dataDone = new Date(infoDate);
        return (
            dataDone.getDate() +
            "/" +
            (dataDone.getMonth() + 1) +
            "/" +
            dataDone.getFullYear()
        );
    };
    return (
        <div>
            <HeaderWithButtons />
            <ForwardSector forward={forwardHistory}/>
        </div>
        
    )
}

export default ViewHistoric;