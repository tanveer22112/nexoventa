export type PublicBatchLike = {
  status: string;
  reservedSeats: number;
  capacity: number;
  course?: { active?: boolean | null } | null;
};

export function isPublicBatchEligible(batch: PublicBatchLike) {
  if (batch.status !== "OPEN") return false;
  if (batch.course && batch.course.active === false) return false;
  if (batch.capacity <= 0) return false;
  if (batch.reservedSeats >= batch.capacity) return false;
  return true;
}

export function getAvailableSeats(batch: PublicBatchLike) {
  return Math.max(batch.capacity - batch.reservedSeats, 0);
}
