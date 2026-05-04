import { type SchemaTypeDefinition } from "sanity";
import { aboutPageType } from "@/sanity/schemaTypes/aboutPageType";
import { competitionsPageType } from "@/sanity/schemaTypes/competitionsPageType";
import { contactPageType } from "@/sanity/schemaTypes/contactPageType";
import { donationsPageType } from "@/sanity/schemaTypes/donationsPageType";
import { galleryCollectionType } from "@/sanity/schemaTypes/galleryCollectionType";
import { homePageType } from "@/sanity/schemaTypes/homePageType";
import { mapEmbedType } from "@/sanity/schemaTypes/mapEmbedType";
import { siteSettingsType } from "@/sanity/schemaTypes/siteSettingsType";
import { teamMemberType } from "@/sanity/schemaTypes/teamMemberType";
import { testimonialType } from "@/sanity/schemaTypes/testimonialType";
import { donationTierType } from "@/sanity/schemaTypes/donationTierType";
import { sponsorType } from "@/sanity/schemaTypes/sponsorType";
import { eventEmbedType } from "@/sanity/schemaTypes/eventEmbedType";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettingsType,
  homePageType,
  aboutPageType,
  competitionsPageType,
  donationsPageType,
  contactPageType,
  teamMemberType,
  testimonialType,
  galleryCollectionType,
  donationTierType,
  sponsorType,
  eventEmbedType,
  mapEmbedType,
];
