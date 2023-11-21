import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import useAnalytics from '../../../hooks/useAnalytics';
import _ from 'lodash';
import { COLORS } from '../../../utils/constants';
import { useTables } from '../../../hooks/useTable';

const ChartRound = () => {
  const { filteredOperations } = useTables();

  const { filteredCategories } = useAnalytics(filteredOperations);
  console.log('filteredCategories:', filteredCategories);

  const data =
    filteredCategories &&
    filteredCategories.reduce((acc, { name, balance: value, bgColor }) => {
      return (acc = [...acc, { name, value, bgColor }]);
    }, []);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={190}
        fill="#8884d8"
        dataKey="value"
      >
        {data?.map(({bgColor}, index) => {
          return (
            <Cell key={`cell-${index}`} fill={COLORS[bgColor]} />
          );
        })}
      </Pie>
    </PieChart>
  );
};

export default ChartRound;
