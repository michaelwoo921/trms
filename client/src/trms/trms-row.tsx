import React from 'react';
import TrmsComponent from './trms.component';
import { Trms } from './trms';

function TrmsRow(props: any) {
    //console.log(props);
    return (
        <section className="row border">
            {props.trmss.map((trms: Trms, index: number) => 
                <TrmsComponent key = {'trms-'+index} data = {trms}></TrmsComponent>)}
        </section>
    );
  }
  

  
  export default TrmsRow;