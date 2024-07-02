import * as SQLite from "expo-sqlite/legacy";

export const db = SQLite.openDatabase("dentalClinic.db");

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  return `${month}-${day}-${year}`;
}

export const insertBioData = (data: any, callback: (id: number | undefined) => void) => {

  db.transaction(
    (tx) => {
      const formattedDateOfBirth = formatDate(data.dateOfBirth);
      tx.executeSql(
        `insert into biodata (firstname, middlename, surname, dateofbirth, homeaddress) values (?, ?, ?, ?, ?)`,
        [data.firstName, data.middleName, data.surname, formattedDateOfBirth, data.homeAddress],
        (_, result) => {
          const insertedId = result.insertId;
          callback(insertedId)
        }  
      );
    },
    (error) => {
      alert(`${error.message}`)
    },
    () => {
      alert(`Your Bio Data has been recorded. 
        Please proceed to the next tab to record your clinic visit information 
        Thanks`);
        data.firstName = '';
        data.surname = '';
        data.middleName = '';
        data.dateOfBirth = new Date();
        data.homeAddress = '';
    }
  );
}

export const insertClinicData = (data: any, biodataid: number) => {
  const formattedClinicDate = formatDate(data.clinicDate);
  const formattedDateNextAppointment = formatDate(data.dateNextAppointment);
  db.transaction(
    (tx) => {
      tx.executeSql(
        `insert into clinicdata (clinicdate, natureofailment, medicineprescribed, procedureundertaken, datenextappointment, biodataid) values (?, ?, ?, ?, ?, ?)`,
        [formattedClinicDate, data.natureOfAilment, data.medicinePrescribed, data.procedureUndertaken, formattedDateNextAppointment, biodataid]);
    },
    (error) => {
      alert(`${error.message}`)
    },
    () => {
      alert(`Your clinic visit information has been recorded. Thanks for visiting`);
      data.clinicDate = new Date();
      data.natureOfAilment = '';
      data.medicinePrescribed = '';
      data.procedureUndertaken = '',
      data.dateNextAppointment = new Date();
    }
  );
}
