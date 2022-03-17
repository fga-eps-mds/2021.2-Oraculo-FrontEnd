import ForwardSector from "../../Components/ForwardSector";
import React, {  useState , useEffect} from "react";
import { useParams } from "react-router";
import SectionMovBlock from "../../Components/SectionMovBlock";
import { getRecordHistory } from "../../Services/Axios/processService";
import toast from "react-hot-toast";

function ViewHistoric(props) {
    const [forward, setForward] = useState([]);
    const  id  = useParams();// TOdo como usar

    useEffect(() => {
        async function fetchHistoryData(){
            const responseHR = await getRecordHistory(toast, 1);
            
            console.log(responseHR);

            const arrInfoForward = await Promise.all(
                responseHR.map((res) => organizeHistoric(res))
            );
            
    
            await setForward(arrInfoForward);
        }

        async function organizeHistoric(res){
            var newForward = []
            const dataFormatadaCreatedAt = formatedDate(res.createdAt);
            const dataFormatadaUpdatedAt = formatedDate(res.updatedAt);

            newForward = {
                setor: "",
                setorOrigin:"",
                date: dataFormatadaCreatedAt,
                dateForward: dataFormatadaUpdatedAt,
                name: "",
            };
            
            return newForward;
        };
        fetchHistoryData();

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
            
            <ForwardSector forward={forward}/>

        </div>
        
    )
}

export default ViewHistoric;
