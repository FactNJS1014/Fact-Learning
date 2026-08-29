import { getUserProfile } from "@/lib/services/user.service";
import { getSessionUser } from "@/lib/auth";
import { getUserAchievements } from "@/lib/services/achievement.service";
import { getUserCertificates } from "@/lib/services/certificate.service";

export const dynamic = "force-dynamic";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const authUser = await getSessionUser();
  if (!authUser) return null;

  const user = await getUserProfile(authUser.id);
  if (!user) return null;

  const achievements = await getUserAchievements(authUser.id);
  const certificates = await getUserCertificates(authUser.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Profile</h1>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{user.xp}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">Level {user.level}</p>
            <p className="text-xs text-muted-foreground">Learning Level</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">🔥 {user.currentStreak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{user._count?.enrollments || 0}</p>
            <p className="text-xs text-muted-foreground">Courses</p>
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="font-bold text-foreground mb-3">Level Progress</h3>
        <div className="w-full bg-secondary rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
            style={{ width: `${((user.xp % 100) / 100) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {100 - (user.xp % 100)} XP to Level {user.level + 1}
        </p>
      </div>

      {/* Achievements */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="font-bold text-foreground mb-4">Achievements</h3>
        {achievements.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No achievements yet. Keep learning!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {achievements.map((ua) => (
              <div
                key={ua.id}
                className="bg-secondary rounded-lg p-3 text-center"
              >
                <span className="text-2xl block mb-1">
                  {ua.achievement.icon || "🏆"}
                </span>
                <p className="text-xs font-medium text-foreground">
                  {ua.achievement.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  +{ua.achievement.xpReward} XP
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificates */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-bold text-foreground mb-4">Certificates</h3>
        {certificates.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            Complete a course to earn a certificate
          </p>
        ) : (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-secondary rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📜</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Certificate {cert.certificateId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(cert.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
