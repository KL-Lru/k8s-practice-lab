import Presenter from 'components/ProgressCircle/presenter';
import React, {useContext} from 'react';
import {ChartProps} from 'react-chartjs-2';
import {TaskContext} from 'reducers/taskReducer';

const Container: React.FC = () => {
  const {tasks} = useContext(TaskContext);
  const completedTask = tasks.filter((task) => task.finished_at).length;
  const notCompletedTask = tasks.length - completedTask;
  const data: ChartProps<'doughnut', number[], string>['data'] = {
    labels: ['完了済み', '未完了'],
    datasets: [{
      data: [completedTask, notCompletedTask],
      backgroundColor: [
        '#7fffd4',
        '#b0c4de',
      ],
      borderColor: [
        '#00ff7f',
        '#778899',
      ],
      borderWidth: 1,
    }],
  };

  return (
    <Presenter data={data} />
  );
};

export default Container;
