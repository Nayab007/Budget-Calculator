import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4'


//const initialExpense = [
  //{id: uuid(),charge: "rent", amount: 2000},
  //{id: uuid(),charge: "car payment", amount: 1000},
 // {id: uuid(),charge: "credit card", amount: 1200}
//];

//useEffect let's perform side effects
// runs after every render
// react re-renders when state has changed or props
const initialcharge = localStorage.getItem('charge')? 
JSON.parse(localStorage.getItem("charge"))
: [];


function App() {
  // **** state values ****
  // this is for expenses, add expense
  const [expenses, setExpenses] = useState(initialcharge);
  // single expense
  const [charge,setCharge] = useState("");
  // single amount 
  const [amount,setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({show:false});
    // edit
  const [edit,setEdit] = useState(false);
   // edit item
   const [id, setId] = useState(0);
    // **** useEffect ****
  useEffect(() =>{
    console.log("lets call useEffect");
    localStorage.setItem("charge", JSON.stringify
    (expenses));
  }, [expenses]);


  // **** functionality ****
  
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
    // handle alert
    const handleAlert = ({type,text}) => {
      setAlert ({show:true,type,text});
      setTimeout(() =>{
        setAlert({show:false})
      },3000)
    }

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0){
        if(edit){
          let tempExpenses = expenses.map(item =>{
            return item.id === id? {...item,charge,amount}
            :item;
          });
          setExpenses(tempExpenses);
          setEdit(false);
          handleAlert({type:"success", text:"item edited"});   
      }else {
        const firstExpense = {id: uuid(), charge, amount: amount}
      setExpenses([...expenses, firstExpense]);
      handleAlert({type:"success", text:"item added"});
        }
      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: `Amount value has to be bigger than zero`
      });
    }
    };
    // clear items 
    const clearItems = () => {
      setExpenses([]);
      handleAlert({type: "danger", text: "everything deleted"});
    };
    // handle delete 
    const handleDelete = (id) => {
      let tempExpenses = expenses.filter(item => item.id 
        !== id);
       setExpenses(tempExpenses)
       handleAlert({type: "danger", text: "item deleted"});
     };
      // handle edit 
      const handleEdit = id => {
        let expense = expenses.find(item => item.id === id)
        let {charge,amount} = expense;
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
        setId(id);
  };
  return (
    <>
    {alert.show && <Alert type={alert.type} 
    text={alert.text}/>}
    <Alert/>
    <h1>Budget Calculator</h1>
    <main className="App">
    <ExpenseForm 
    charge={charge} 
    amount={amount}
    handleAmount={handleAmount} 
    handleCharge={handleCharge}
    handleSubmit={handleSubmit}
    edit={edit}
    />
    <ExpenseList expenses={expenses} handleDelete=
    {handleDelete}
    handleEdit={handleEdit} clearItems={clearItems}
    />
    </main>
    <h1>
      total spending : {" "}
      <span className="total">
        $ {" "}
        {expenses.reduce((acc, curr) => {
        return (acc += parseInt(curr.amount)); 
        }, 0)}
      </span>
    </h1>
    </>
  );
}

export default App;
