export interface Options{
    width: number;
    height: number;
    margin?: Margin;
    backgroundColor?: string;
    responsive?: boolean;
    xAxis: AxisProperties;
}

export interface AxisProperties{
    padding?: number;
}

export class Margin{
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}

export class ScaleProperties{
    domain: any;
    range: [number, number];
    padding?: number;
}
