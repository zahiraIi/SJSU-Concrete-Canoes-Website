import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "SJSU Concrete Canoes CMS",
  schema: {
    types: schemaTypes,
  },
  plugins: [deskTool(), visionTool()],
  apiVersion,
});
