import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import CommonTable from '../../common/CommonTable';


const columnName = [
  {
    title:"Company Name",
    key:"company_name",
  },
  {
    title: "Job Title",
    key: "title",

  },
  {
    title: "Job location",
    key: "location",
  },
  {
    title: "status",
    key: "status",
  },
  {
    title:"Jobid",
    key:"jobId",
  }
 
  // {
  //   title: "applied on",
  //   key: "createdAt"
  // }
]
function CandidateApplication() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = useState(null);
  const fetchData = async () => {
    const q = query(collection(db, 'applications'), where("candidateId", '==', userInfo.uid))
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, '=>', doc.data())
      data.push(doc.data());
    });
    console.log(data, "data")
    setAllApplications(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>

      {allApplications && allApplications.length > 0 ? (
        <div> <CommonTable data={allApplications} columnsName={columnName} /></div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>

      )}

    </div>
  )
}

export default CandidateApplication
