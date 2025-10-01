import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function useEChart(option, deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !option) return;
    const chart = echarts.init(el, null, { renderer: 'canvas' });
    chart.setOption(option, true);
    const onResize = () => chart.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      chart.dispose();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}
