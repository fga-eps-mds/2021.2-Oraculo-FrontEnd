import ForwardSector from "../../Components/ForwardSector";
import React, {  useState , useEffect} from "react";
import { useParams } from "react-router";
//import ReactDOM from "react-dom";
//import { matchPath } from "react-router-dom"
import SectionMovBlock from "../../Components/SectionMovBlock";
import { getRecordHistory , getUserByEmail} from "../../Services/Axios/processService";
import toast from "react-hot-toast";
import {
    getDepartments,
    getInfoUser,
} from "../../Services/Axios/profileService";

function ViewHistoric() {
    const [forwardHistory, setForwardHistory] = useState([]);
    
    //function BlogPost() {
        // Desconstruímos da URL a varíavel idPost
    //    const { idPost } = useParams();
    //    return <div>ID do post: {idPost}</div>;
    //  }
    const  {id}  = useParams();
    console.log(id)
    
    // {
    //     const { location } = useRouter()
    //     const { pathname } = location
      
    //     const pattern = `(.*)?${path}`
    //     const match = matchPath(pathname, { path: pattern }) || {}
      
    //    return match.params
    //  };

    useEffect(() => {
        // deve salvar historico no forwardHistory 
        async function saveHistoryData(){
            const responseHistory = await getRecordHistory(toast, 1);
            //console.log(responseHistory);//! remove
            const arrayForwardHistory = await Promise.all(
                responseHistory.map((history) => organizeHistory(history))
            );
            setForwardHistory(arrayForwardHistory);
        }
        
        // deve organizar um historico para seu respectivo formato
        async function organizeHistory(history){

            var newForwardHistory = []
            const email = history.forwarded_by;
            console.log(email);
            // caso seja 
            if(email != null){
                const originSecID = history.origin_id;
                
                const destinationID = history.destination_id;
                // Todo: remover req daqui
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
                
            }
            return newForwardHistory;
        };
        saveHistoryData();
        // ? deve estar aqui?
        const getDate = () => {
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, "0");
            var mes = String(data.getMonth() + 1).padStart(2, "0");
            var ano = data.getFullYear();
            return dia + "/" + mes + "/" + ano;
        };
    });
    
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
            <ForwardSector forward={forwardHistory}/>
        </div>
        
    )
}

export default ViewHistoric;
