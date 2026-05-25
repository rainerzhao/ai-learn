import fs from 'node:fs';
import path from 'node:path';

export interface LearningStep {
  step: string;
  desc: string;
}

export interface Module {
  id: string;
  dirName: string;
  name: string;
  icon: string;
  description: string;
  priority: string;
  status: string;
  learning_path: LearningStep[];
  highlights: string[];
}

const MODULES_YML_PATH = path.resolve(process.cwd(), '_data/modules.yml');

function parseModulesYml(): Module[] {
  const raw = fs.readFileSync(MODULES_YML_PATH, 'utf-8');
  const modules: Module[] = [];

  const idMap: Record<string, string> = {
    '01': '01_hardware_architecture',
    '02': '02_gpu_programming',
    '03': '03_ai_cluster_operations',
    '04': '04_cloud_native_ai_platform',
    '05': '05_model_training_and_fine_tuning',
    '06': '06_llm_theory_and_foundation',
    '07': '07_rag_and_tools',
    '08': '08_agentic_system',
    '09': '09_inference_system',
    '10': '10_ai_related_course',
    '11': '98_llm_programming',
    '12': '99_tools_and_misc',
  };

  const blocks = raw.split(/- id:/).slice(1);
  for (const block of blocks) {
    const id = (block.match(/["']?(\d+)["']?/)?.[1] ?? '').trim();
    const name = (block.match(/name:\s*["'](.+?)["']/)?.[1] ?? '').trim();
    const icon = (block.match(/icon:\s*["'](.+?)["']/)?.[1] ?? '').trim();
    const description = (block.match(/description:\s*["'](.+?)["']/)?.[1] ?? '').trim();
    const priority = (block.match(/priority:\s*["'](.+?)["']/)?.[1] ?? '').trim();
    const status = (block.match(/status:\s*["'](.+?)["']/)?.[1] ?? '').trim();

    const learningPath: LearningStep[] = [];
    const lpMatches = [...block.matchAll(/- step:\s*["'](.+?)["']\s*\n\s+desc:\s*["'](.+?)["']/g)];
    for (const m of lpMatches) {
      learningPath.push({ step: m[1], desc: m[2] });
    }

    const highlights: string[] = [];
    const hlSection = block.split('highlights:')[1];
    if (hlSection) {
      const hlMatches = [...hlSection.matchAll(/- ["'](.+?)["']/g)];
      for (const m of hlMatches) {
        highlights.push(m[1]);
      }
    }

    if (id && name) {
      modules.push({
        id,
        dirName: idMap[id] ?? `XX_unknown`,
        name,
        icon,
        description,
        priority,
        status,
        learning_path: learningPath,
        highlights,
      });
    }
  }

  return modules;
}

let _cached: Module[] | null = null;

export function getModules(): Module[] {
  if (!_cached) _cached = parseModulesYml();
  return _cached;
}

export function getModuleByDir(dirName: string): Module | undefined {
  return getModules().find(m => m.dirName === dirName);
}
