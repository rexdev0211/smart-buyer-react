import { getMetaTitle } from './searchHelper';
import {t} from '../i18n';

test('0 brands, 0 tags => Title: SmartBuyer', () => {
  expect(getMetaTitle({
    tags: [],
    brands: []
  }, t)).toBe("SmartBuyer");
});

test('3 brands, 7 tags => Title: 3 brands, 5 tags', () => {
  expect(getMetaTitle({
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
    brands: ['brand1', 'brand2', 'brand3']
  }, t)).toBe("brand1, brand2, brand3 | tag1, tag2, tag3, tag4, tag5 | SmartBuyer");
});

test('6 brands, 7 tags => Title: 5 brands, 3 tags', () => {
  expect(getMetaTitle({
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
    brands: ['brand1', 'brand2', 'brand3', 'brand4', 'brand5', 'brand6'],
  }, t)).toBe("brand1, brand2, brand3, brand4, brand5 | tag1, tag2, tag3 | SmartBuyer");
});

test('9 brands, 1 tags => Title: 7 brands, 1 tags', () => {
  expect(getMetaTitle({
    tags: ['tag1'],
    brands: ['brand1', 'brand2', 'brand3', 'brand4', 'brand5', 'brand6', 'brand7', 'brand8', 'brand9'],
  }, t)).toBe("brand1, brand2, brand3, brand4, brand5, brand6, brand7 | tag1 | SmartBuyer");
});

test('9 brands, 0 tags => Title: 8 brands, 0 tags', () => {
  expect(getMetaTitle({
    tags: [],
    brands: ['brand1%20with%20space', 'brand2', 'brand3', 'brand4', 'brand5', 'brand6', 'brand7', 'brand8', 'brand9']
  }, t)).toBe("brand1 with space, brand2, brand3, brand4, brand5, brand6, brand7, brand8 | SmartBuyer");
});

test('0 brands, 9 tags => Title: 0 brands, 8 tags', () => {
  expect(getMetaTitle({
    tags: ['tag1', 'tag2%20with%20space', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9'],
    brands: []
   }, t)).toBe("tag1, tag2 with space, tag3, tag4, tag5, tag6, tag7, tag8 | SmartBuyer");
});

test('special characters', () => {
  const specialCharsString = '($,%,^,&,*,!,@,#,$) +';
  const tagUrl = encodeURIComponent(`Some special chars in tag like: ${specialCharsString}`);
  const brandUrl = encodeURIComponent(`Some special chars in brand like: ${specialCharsString}`);
  expect(getMetaTitle({
    tags: [tagUrl],
    brands: [brandUrl],
  }, t)).toBe(`Some special chars in brand like: ${specialCharsString} | Some special chars in tag like: ${specialCharsString} | SmartBuyer`);
});


