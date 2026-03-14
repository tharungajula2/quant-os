declare module "react-force-graph-2d" {
  import { ComponentType } from "react";

  interface ForceGraphProps {
    graphData: { nodes: unknown[]; links: unknown[] };
    width?: number;
    height?: number;
    backgroundColor?: string;
    nodeCanvasObject?: (node: unknown, ctx: CanvasRenderingContext2D, globalScale: number) => void;
    nodePointerAreaPaint?: (node: unknown, color: string, ctx: CanvasRenderingContext2D) => void;
    linkColor?: string | ((link: unknown) => string);
    linkWidth?: number | ((link: unknown) => number);
    onNodeClick?: (node: unknown, event: MouseEvent) => void;
    nodeLabel?: string | ((node: unknown) => string);
    cooldownTicks?: number;
    d3AlphaDecay?: number;
    d3VelocityDecay?: number;
    [key: string]: unknown;
  }

  const ForceGraph2D: ComponentType<ForceGraphProps>;
  export default ForceGraph2D;
}
