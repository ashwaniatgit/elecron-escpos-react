import React from 'react';

var styles = {
  sideNav: {
    color: "red",
    background: "#014836",
    height: "100vh",
    width: '10%',
  },
  content: {
    padding: '2rem',
    width: '90%',
  },
  printButton: {
    height: 25,
    minWidth: 80,
    borderRadius: 4,
    boxShadow: 'none',
    borderWidth: 0
  }
}

const ordersList = [
  {name: 'Masroom', restaurant: 'Mamemi', orderId: 12345, pax: 3, deliveryDate: '2021-07-21'},
  {name: 'Pizza', restaurant: 'Latro', orderId: 12307, pax: 3, deliveryDate: '2021-07-21'},
  {name: 'Grilled salmon and asparages', restaurant: 'The Organic Boho', orderId: 12309, pax: 3, deliveryDate: '2021-07-21'},
];

const Orders = (props) => {
  const { classes } = props;
  const [selected, setSelected] = React.useState({});

  const handleSelection = (selectedItem) => {
    setSelected(selectedItem);
  }

  const handlePrint = () => {
    console.log('Print clicked');
    // printFromDevice();
  }

  const orderItem = (item) => {
    return (
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: '#f5f5f5', 
        padding: 10, 
        marginBottom: 5}}
      >
        <div style={{width: '10%'}}>
          <div 
            style={{
              width: 12, 
              height: 12, 
              background: item.orderId === selected.orderId ? '#014836': '#f5f5f5', 
              borderRadius: 5, 
              border: '1px solid'
            }}
            onClick={() => handleSelection(item)}
        ></div>
        </div>
        <div style={{width: '25%'}}>
          <p>{item.name}</p>
        </div>
        <div style={{width: '25%'}}>
          <p>{item.restaurant}</p>
        </div>
        <div style={{width: '20%'}}>
          <p>{item.orderId}</p>
        </div>
        <div style={{width: '20%'}}>
          <p>{item.deliveryDate}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{display: "flex", width: '100%'}}>
      <div style={styles.sideNav}></div>
      <div style={styles.content}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>Your order overview</h3>
          <button 
            disabled={!selected.orderId} 
            style={styles.printButton}
            onClick={handlePrint}
          >Print</button>
        </div>  
        <div style={{marginTop: 50}}>
          {ordersList.map((item, index) => {
            return <div key={index}>{orderItem(item)}</div>
          })}
        </div>      
      </div>
    </div>
  );
};

export default Orders;
