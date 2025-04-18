
import { lazy, Suspense } from 'react';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import type { CardProps } from '@mui/material';

// ----------------------------------------------------------------------
// Formatting Utils

type InputNumberValue = string | number | null | undefined;
type Options = Intl.NumberFormatOptions;
const DEFAULT_LOCALE = { code: 'en-US', currency: 'USD' };

function processInput(inputValue: InputNumberValue): number | null {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

function fNumber(inputValue: InputNumberValue, options?: Options) {
  const number = processInput(inputValue);
  if (number === null) return '';
  return new Intl.NumberFormat(DEFAULT_LOCALE.code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);
}

// ----------------------------------------------------------------------
// Chart Component with Lazy Loading

const LazyChart = lazy(() =>
  import('react-apexcharts').then((module) => ({ default: module.default }))
);

function ChartLoading({ height = 360 }: { height?: number }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height }}>
      <CircularProgress />
    </Box>
  );
}

const ChartRoot = styled('div')(({ theme }) => ({
  width: '100%',
  flexShrink: 0,
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 1.5,
}));

function Chart({
  type,
  series,
  options,
  height = 360,
}: {
  type: string;
  series: any;
  options: any;
  height?: number;
}) {
  return (
    <ChartRoot>
      <Suspense fallback={<ChartLoading height={height} />}>
        <LazyChart type={type} series={series} options={options} width="100%" height={height} />
      </Suspense>
    </ChartRoot>
  );
}

// ----------------------------------------------------------------------
// useChart hook (basic default options generator)

function useChart(customOptions: any = {}) {
  return {
    chart: { toolbar: { show: false } },
    tooltip: { theme: 'light' },
    legend: { show: false },
    grid: { strokeDashArray: 3, borderColor: '#919EAB33' },
    stroke: { width: 2 },
    ...customOptions,
  };
}

// ----------------------------------------------------------------------
// Main Component



type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: any;
  };
};

export function AnalyticsConversionRates({ title, subheader, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    hexAlpha(theme.palette.primary.dark, 0.24),
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2, colors: ['transparent'] },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: { formatter: (seriesName: string) => `${seriesName}: ` },
      },
    },
    xaxis: { categories: chart.categories },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: { fontSize: '10px', colors: ['#FFFFFF', theme.palette.text.primary] },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2,
        barHeight: '48%',
        dataLabels: { position: 'top' },
      },
    },
    ...chart.options,
  });

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Chart type="bar" series={chart.series} options={chartOptions} />
    </Card>
  );
}
export {}