---
title: 2.5D、3D、玻璃基板与 ABF 封装互连对比
description: 聚焦硅中介层、RDL、ABF build-up、玻璃通孔、凸点、焊球与 SerDes 信号路径。
module: 硬件架构
tags:
  - 先进封装
  - 2.5D
  - 3D
  - ABF
  - 玻璃基板
  - SerDes
date: 2026-06-17
---

# 2.5D、3D、玻璃基板与 ABF 封装互连对比

> 本文来自已有 HTML 材料的站内化整理，保留核心概念与工程拆解方式。重点不是追逐名词，而是把封装结构放回 AI 基础设施的性能、成本和良率判断里。

## TL;DR

2.5D 的核心是把多个裸片横向放在中介层或高密度桥接结构上。3D 的核心是把裸片垂直堆叠并缩短信号路径。ABF 是当前高端有机封装基板的主流绝缘 build-up 材料。玻璃基板则试图用更高平整度、更好尺寸稳定性和更细线宽承接下一代大尺寸封装。

凸点、微凸点、铜柱、C4 和 BGA 焊球不是同一层东西。它们分别对应 die-to-package、die-to-interposer、package-to-board 等不同界面。

## 1. 封装里的四条互连边界

讨论 2.5D、3D、ABF、玻璃基板时，容易把材料、结构、互连和 I/O 协议混在一起。更清晰的拆法是先看四条边界：

| 边界 | 典型结构 | 关键问题 |
| --- | --- | --- |
| Die to die | 2.5D interposer、bridge、3D stack | 裸片之间的互连密度、距离、功耗和良率。 |
| Die to package | bump、micro-bump、hybrid bonding、RDL | 裸片如何落到中介层或封装基板。 |
| Package to board | BGA、LGA、socket、PCB | 封装如何连接主板、电源和高速 I/O。 |
| Channel / PHY | SerDes、D2D PHY、均衡、时钟恢复 | 高速信号在封装、PCB、连接器中的链路预算。 |

对 AI 架构师来说，这四条边界决定了 HBM 能不能靠近 GPU、chiplet 能不能高效协同、GPU 间互联能耗能不能下降，以及机柜级系统能不能在功耗和散热上收敛。

## 2. 2.5D 与 3D：横向拼接和垂直堆叠不是一件事

2.5D 常见形态是逻辑裸片与 HBM 或 chiplet 在硅中介层、局部硅桥或高密度 RDL 上横向互连，再通过封装基板出板。它更像一块“高密度封装内主板”。

3D 则把逻辑或存储裸片垂直堆叠，依靠 TSV、微凸点或混合键合缩短互连距离。它更像把芯片层叠成一个立体器件。

| 维度 | 2.5D 封装 | 3D 封装 |
| --- | --- | --- |
| 空间方向 | 横向集成 | 垂直堆叠 |
| 常见用途 | GPU + HBM、chiplet 横向互连 | 存储堆叠、逻辑堆叠、超短距互连 |
| 主要收益 | 高带宽、相对可控的热路径、适合大封装 | 更短互连、更高密度、更低每 bit 能耗 |
| 主要风险 | 中介层面积、封装成本、供电与良率 | 热管理、测试、返修、堆叠良率 |

## 3. ABF 与玻璃基板：一个是当前主流，一个是下一代候选

ABF 指 Ajinomoto Build-up Film，是高端有机封装基板 build-up 绝缘层的关键材料。它通常与铜线路、激光微孔、核心层和多层积层工艺配合。

玻璃基板不是替代所有 ABF 层，而是把“核心载体”的材料从有机材料推向玻璃，以追求更好的平整度、尺寸稳定性、更低翘曲和更细互连能力。

| 对比项 | ABF 基板 | 玻璃基板 |
| --- | --- | --- |
| 技术位置 | 高端有机封装基板的 build-up 材料 | 下一代封装基板核心层或载体平台 |
| 主要优势 | 供应链成熟、量产经验丰富 | 平整度、尺寸稳定性和细线宽潜力更强 |
| 主要挑战 | 大尺寸封装、细线宽和翘曲压力 | TGV、玻璃金属化、切割、缺陷控制和可靠性 |
| 误区 | ABF 不是全部封装技术 | 玻璃基板不是短期无痛替换 ABF 生态 |

“玻璃基板 vs ABF”不是严格同层级对比。市场表达里常把它们对比，是因为二者都指向先进封装基板路线，但技术边界应该拆开看。

## 4. 凸点、微凸点、焊球和高点：按位置和尺度理解

这些名词容易混淆，核心区别是它们处在不同物理界面：

| 名称 | 常见位置 | 作用 |
| --- | --- | --- |
| Micro-bump | die 与中介层、die 与 die | 高密度短距互连，常见于 2.5D/3D。 |
| C4 bump / copper pillar | die 到封装载体 | 连接裸片和封装基板或中介层。 |
| BGA solder ball | package 到 PCB | 连接封装和主板，间距更大，承载供电和 I/O。 |
| Hybrid bonding | die 与 die | 更高密度、更短距离，适合先进 3D 集成。 |

从系统视角看，越靠近裸片，互连密度越高、距离越短、制造难度越大；越靠近主板，互连间距越大，但会承受更多板级信号完整性和供电挑战。

## 5. SerDes：它在芯片上，但被封装结构牵制

SerDes 是高速串行收发器，封装不是 SerDes 的替代物，而是它的物理通道的一部分。

传统板级 SerDes 要穿过封装基板、BGA、PCB、连接器和线缆。die-to-die 或 2.5D/3D 内部互连距离更短，可以降低每 bit 能耗，但需要更高密度的 bump、RDL 和中介层支持。

一个简化链路预算可以这样看：

```text
SerDes PHY -> package trace -> via / bump -> PCB trace -> connector / cable -> receiver EQ
```

封装越复杂，越需要在带宽、损耗、串扰、时钟、均衡和良率之间做工程权衡。

## 6. 一句话选型框架

| 技术 | 适合解决 | 不适合误解为 |
| --- | --- | --- |
| 2.5D | GPU 与 HBM、chiplet 横向高带宽互连 | 所有先进封装的总称 |
| 3D | 超短距离、高密度、垂直堆叠 | 免费提升，不考虑热和测试 |
| ABF 基板 | 当前高端封装基板主流路线 | 2.5D/3D 的替代物 |
| 玻璃基板 | 下一代大尺寸、细线宽、低翘曲候选 | 已经无痛量产替代 ABF |
| SerDes / D2D PHY | 高速信号收发和链路训练 | 只属于板级网络，不受封装影响 |

## 7. 对 AI Infra 的判断价值

- HBM 与 GPU 的距离决定了显存带宽和每 bit 能耗。
- chiplet 化会把封装良率、测试和互连成本变成系统成本的一部分。
- 大尺寸封装会把基板材料、翘曲、供电和散热推到关键路径。
- SerDes 和 D2D PHY 的演进，会影响 GPU-GPU、GPU-NIC、GPU-CPU 的互连选择。

## 参考资料

- TSMC: [CoWoS 2.5D advanced packaging overview](https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm)
- Intel: [Glass substrates for advanced packaging](https://www.intel.com/content/www/us/en/newsroom/news/intel-unveils-industry-leading-glass-substrates.html)
- NVIDIA: [Blackwell architecture](https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/)
