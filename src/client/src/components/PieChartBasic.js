import { Pie } from '@ant-design/plots';


const PieChartBasic = (props) => {
  const config = {
    appendPadding: 10,
    data: props.data,
    angleField: 'pre_tax_amount',
    colorField: props.option,
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Category Plot',
      },
    },
  };
  return <Pie {...config} />;
};

export default PieChartBasic;
