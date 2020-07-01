import { format, isFuture } from "date-fns";
import eachMinuteOfInterval from "./eachMinuteOfInterval";
import curry from "lodash/fp/curryRight";

const curriedFormat = curry(format)({});

const timeIntervals = (start, end, interval, format = "h:mm a") =>
  eachMinuteOfInterval({ start, end }, { step: interval })
    .filter(isFuture)
    .map((date) => curriedFormat(format)(date));

let now = new Date();

export const morning = timeIntervals(
  new Date(now.setHours(0, 0)),
  new Date(now.setHours(11, 59)),
  15
);

export const noon = timeIntervals(
  new Date(now.setHours(12, 0)),
  new Date(now.setHours(17, 45)),
  15
);

export const night = timeIntervals(
  new Date(now.setHours(18, 0)),
  new Date(now.setHours(23, 59)),
  15
);
