import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../Services/apiConnector'
import { PropertyEndPoints } from '../../Services/api';
import { useSelector } from 'react-redux';
import PropertyCard from '../PropertyListCard/propertyListCard';
import ConfirmationModal from '../ConfirmationModal';


export const PropertyList = () => {
  const [propertyList,setPropertyList] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state)=>state.user);
  const {MYPROPERTIES_API} = PropertyEndPoints;


  const fetchPropertyList = async()=>{
    const propertyList = await apiConnector("GET",MYPROPERTIES_API,null,{
      Authorization: `Bearer ${token}`,
    })
    console.log(propertyList.data.MyProperties);
    setPropertyList(propertyList.data.MyProperties);
  }

  useEffect(()=>{
    fetchPropertyList();
  },[])
  return (
    <>
    <div>
    {propertyList.length>0 ? <h1 className="profile-header">My Properties</h1> : <h1 className="profile-header">No Active Property</h1>}
    <div>
      {
        propertyList.map((property)=>{
          return <PropertyCard property={property} setConfirmationModal={setConfirmationModal}/>
        })
      }
    </div>
    </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
