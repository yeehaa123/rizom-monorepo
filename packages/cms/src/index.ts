import type { AstroConfig, AstroIntegration } from 'astro';

import * as path from 'path';
import * as cache from './cache';
import * as filetree from "./filetree";
import * as mt from "./metaTable";
import * as ot from "./outputTable";
import * as series from "./series";
import * as article from "./article";
import * as course from "./course";
import * as landing from "./landing";
import * as profile from "./profile";
import * as tag from "./tag";
import * as collections from "./collections";
import { initDirs } from "./helpers";

const OUTPUT_BASE = './content';
const INPUT_BASE = './yeehaa';
const CMS_PATH = path.join("./CMS");

export const PATH_SUFFIXES = [
  article.PATH_SUFFIX,
  course.PATH_SUFFIX,
  profile.PATH_SUFFIX,
  series.PATH_SUFFIX,
  tag.PATH_SUFFIX,
  landing.PATH_SUFFIX,
];

async function convert({ input_base, output_base, cms_path }: { input_base: string, output_base: string, cms_path: string }) {
  await initDirs(output_base, PATH_SUFFIXES);
  await mt.init(cms_path);
  await cache.init();

  const tree = await filetree.create(input_base);
  const metaTableData = await mt.read(cms_path);
  filetree.update(tree, metaTableData);

  const outputTable = filetree.toOutputTable(tree);
  const analyzedTable = await ot.analyze(outputTable);
  const seriesTable = collections.deriveSeries(analyzedTable);
  const tagsTable = collections.deriveTags(analyzedTable);

  const associatedTable = ot.associate([...analyzedTable, ...seriesTable, ...tagsTable]);
  const augmentedTable = await ot.augment(associatedTable);

  await ot.write(output_base, augmentedTable);
  const metaTable = filetree.toMetaTable(tree);
  await mt.write(cms_path, metaTable);
}

<<<<<<< HEAD
export function addCMS(): AstroIntegration {
  let config: AstroConfig;
  return {
    name: "@rizom/cms",
    hooks: {
      'astro:config:done': async ({ config: cfg }) => {
        config = cfg;
        console.log(config);
      },
    }
  }
}

convert({ input_base: INPUT_BASE, output_base: OUTPUT_BASE, cms_path: CMS_PATH });
=======
main();

export { article, course, profile, landing, series, tag }
>>>>>>> refactor
