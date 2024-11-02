import 'dotenv/config'
import * as path from 'path';
import { readdir, readFile } from 'fs/promises';
import { parse } from 'yaml'
import { insertMetaEntry } from './models/meta';
import { courseSchema } from '@offcourse/schema';
import { insertCuratedCourse } from './models/curated';
import { insertBookmarkedCourse } from './models/bookmark';


async function seedMeta(fileName?: string) {
  if (fileName) {
    const data = await readFile(fileName, 'utf8');
    const meta = parse(data);
    await insertMetaEntry(meta);
    return meta;
  } else {
    throw ("META FILENAME MISSING");
  }
}

async function seedCourses({ dirName, alias }: { dirName?: string, alias: string }) {
  if (dirName) {
    const dir = await readdir(dirName);
    for (const fileName of dir) {
      const filePath = path.join(dirName, fileName);
      const data = await readFile(filePath, 'utf8');
      const course = courseSchema.parse(parse(data));
      const isCurator = alias.toLowerCase() === course.curator.alias.toLowerCase();
      if (isCurator) {
        const res = await insertCuratedCourse(course);
        console.log("CURATED", res);
      } else {
        const res = await insertBookmarkedCourse(course);
        console.log("NOT CURATED", res);
      }
    }
  } else {
    throw ("COURSES DIRNAME MISSING");
  }
}

async function main() {
  const [_, __, metaFileName, dirName] = process.argv;
  const { alias } = await seedMeta(metaFileName);
  await seedCourses({ dirName: dirName, alias });
}

main();

