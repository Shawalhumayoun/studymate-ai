export interface SampleNote {
  id: string;
  title: string;
  category: string;
  iconName: string;
  content: string;
}

export const SAMPLE_NOTES: SampleNote[] = [
  {
    id: 'biology-photosynthesis',
    title: 'Photosynthesis & Cellular Respiration',
    category: 'Biology',
    iconName: 'Leaf',
    content: `Photosynthesis is the chemical process through which photoautotrophic organisms (like green plants, algae, and cyanobacteria) convert light energy into chemical energy stored in glucose.

Equation for Photosynthesis:
6 CO2 + 6 H2O + light energy -> C6H12O6 + 6 O2

Key Stages of Photosynthesis:
1. Light-Dependent Reactions:
- Location: Thylakoid membranes inside chloroplasts.
- Process: Sunlight strikes chlorophyll, exciting electrons. Water molecules (H2O) undergo photolysis (splitting into oxygen, protons, and electrons).
- Products: Oxygen gas (O2 as a byproduct), ATP (energy molecule), and NADPH (electron carrier).

2. Light-Independent Reactions (Calvin Cycle / Dark Reactions):
- Location: Stroma of the chloroplast.
- Process: Carbon dioxide (CO2) is fixed using the enzyme RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase) and reduced using ATP and NADPH generated in light reactions.
- Products: G3P (glyceraldehyde 3-phosphate), which synthesizes Glucose (C6H12O6).

Cellular Respiration Overview:
Cellular respiration is the metabolic pathway that breaks down glucose to produce ATP energy for biological processes.
Equation: C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + ~36-38 ATP

Phases of Respiration:
1. Glycolysis: Occurs in the cytoplasm (anaerobic). Splitting glucose (6C) into two pyruvate molecules (3C). Yields 2 net ATP and 2 NADH.
2. Krebs Cycle (Citric Acid Cycle): Occurs in the mitochondrial matrix. Converts pyruvate to Acetyl-CoA, producing NADH, FADH2, CO2, and 2 ATP.
3. Electron Transport Chain (ETC) & Chemiosmosis: Occurs on the inner mitochondrial membrane (cristae). High-energy electrons from NADH and FADH2 power proton pumps creating a gradient across ATP synthase. Generates ~32-34 ATP. Oxygen acts as the final electron acceptor forming water.`
  },
  {
    id: 'history-industrial-rev',
    title: 'The First Industrial Revolution (1760-1840)',
    category: 'History',
    iconName: 'Factory',
    content: `The First Industrial Revolution began in Great Britain in the mid-18th century and fundamentally transformed global economic, social, and political structures from agrarian handicraft societies to mechanized industrial economies.

Key Technological Innovations:
1. Steam Engine: Improved by James Watt in 1776, replacing human and animal labor with steam power. Powered textile factories, coal mines, and steamships.
2. Textile Mechanization: Inventions such as John Kay's Flying Shuttle (1733), James Hargreaves' Spinning Jenny (1764), and Eli Whitney's Cotton Gin (1793) exponentially increased cloth production.
3. Iron Smelting: Henry Cort developed the puddling process for refining wrought iron, enabling strong structural building materials and railway rails.
4. Railways & Transport: George Stephenson's Rocket locomotive (1829) ignited the Railway Age, reducing transport costs and linking distant markets.

Socioeconomic Impacts:
- Urbanization: Rapid migration from rural agricultural villages to crowded industrial cities (Manchester, Birmingham, London).
- Factory System: Workers gathered under one roof with strict working hours, structured shifts, and dangerous machinery.
- Working Conditions: Child labor was widespread; long 12-16 hour shifts; lack of safety regulations; pollution and toxic air.
- Rise of Capitalism & Social Classes: Emergence of the wealthy industrialist class (bourgeoisie) alongside the urban working class (proletariat). Inspired Karl Marx and Friedrich Engels to publish The Communist Manifesto in 1848.`
  },
  {
    id: 'cs-operating-systems',
    title: 'OS Process Management & Memory Management',
    category: 'Computer Science',
    iconName: 'Cpu',
    content: `Operating System (OS) fundamentals focus on managing hardware resources efficiently while executing user programs safely.

Process Management Concepts:
1. Process Definition: A process is an instance of a computer program being executed. It contains program code, current activity (program counter, registers), and memory sections (text, data, heap, stack).
2. Process Control Block (PCB): Kernel data structure containing process state, PID, memory pointers, scheduling info, and I/O status.
3. Process States:
- New: Process is being created.
- Ready: Waiting to be assigned to CPU.
- Running: Instructions are being executed by CPU.
- Waiting/Blocked: Waiting for I/O event or signal.
- Terminated: Execution finished.

CPU Scheduling Algorithms:
- First-Come, First-Served (FCFS): Non-preemptive, simple, but suffers from Convoy Effect.
- Shortest Job First (SJF): Optimal average waiting time, but requires knowing burst time in advance.
- Round Robin (RR): Preemptive scheduling with a fixed time quantum; optimal for time-sharing systems.

Memory Management & Virtual Memory:
1. Paging: Memory management scheme that eliminates physical memory contiguous allocation needs. Physical memory is divided into fixed-size blocks called Frames, and logical memory into Pages.
2. Page Table: Maps logical page addresses to physical frame addresses. Translates Virtual Address = (Page Number, Offset).
3. Virtual Memory & Demand Paging: Allows execution of processes not completely loaded in physical RAM. Swapping pages between RAM and Secondary Storage (Disk/SSD).
4. Page Fault: Interrupt triggered when a process accesses a page not currently present in RAM, prompting OS to retrieve it from swap space.`
  }
];
