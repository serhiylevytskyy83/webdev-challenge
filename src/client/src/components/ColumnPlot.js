import { Column } from '@ant-design/plots';

const ColumnPlot = (props) => {
       
  const config = {
    data: props.data,
    xField: 'date',
    yField: 'pre_tax_amount',
    columnWidthRatio: 1.6,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    
    minColumnWidth: 20,
    maxColumnWidth: 20,
  };
  return <Column {...config} />;
};

export default ColumnPlot;
