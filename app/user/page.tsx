"use client"

import { useState } from "react"
import { ArrowLeft, HelpCircle, Bell, Mail, Phone, MapPin, Building, Shield, Edit, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "../components/theme-toggle"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock user data
const userData = {
  id: "USR-001",
  name: "Max Kowalski",
  email: "max.k@example.com",
  phone: "+1 (555) 123-4567",
  role: "Administrator",
  department: "Compliance",
  location: "New York, NY",
  joinDate: "January 15, 2022",
  status: "Active",
  avatarUrl:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-02%20at%2011.08.45%E2%80%AFAM-AffLYlH3E3alKZzLeiso0Ng8V9QC0h.png",
  permissions: [
    { name: "User Management", access: "Full Access" },
    { name: "Case Management", access: "Full Access" },
    { name: "Transaction Monitoring", access: "Full Access" },
    { name: "Alert Management", access: "Full Access" },
    { name: "Report Generation", access: "Full Access" },
    { name: "System Configuration", access: "Full Access" },
  ],
  recentActivity: [
    { action: "Approved case", target: "CASE-001", timestamp: "Today, 10:30 AM" },
    { action: "Reviewed alert", target: "ALT-005", timestamp: "Today, 9:15 AM" },
    { action: "Updated user permissions", target: "USR-003", timestamp: "Yesterday, 4:45 PM" },
    { action: "Generated monthly report", target: "REP-2024-08", timestamp: "Yesterday, 2:30 PM" },
    { action: "Closed case", target: "CASE-002", timestamp: "Aug 28, 2024, 11:20 AM" },
  ],
  securitySettings: {
    twoFactorEnabled: true,
    lastPasswordChange: "July 15, 2024",
    sessionTimeout: "30 minutes",
    loginAttempts: "5 attempts",
  },
}

export default function UserProfile() {
  const router = useRouter()
  const [user] = useState(userData)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">User Profile</h1>
          <span className="text-muted-foreground">{user.name}</span>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={`${user.name}'s avatar`} />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatarUrl} alt={`${user.name}'s avatar`} />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {user.role}
                  </Badge>
                </div>
                <div className="mt-6 w-full space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your personal and contact information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground w-24">Email:</span>
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground w-24">Phone:</span>
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground w-24">Location:</span>
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground w-24">Department:</span>
                        <span>{user.department}</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground w-24">Role:</span>
                        <span>{user.role}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Permissions</CardTitle>
                    <CardDescription>Your access permissions in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Module</TableHead>
                          <TableHead>Access Level</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {user.permissions.map((permission, index) => (
                          <TableRow key={index}>
                            <TableCell>{permission.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50 text-green-600">
                                {permission.access}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent actions in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mr-4 mt-0.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <Shield className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {activity.action}: <span className="font-mono">{activity.target}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Badge variant={user.securitySettings.twoFactorEnabled ? "default" : "outline"}>
                          {user.securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-muted-foreground">
                            Last changed: {user.securitySettings.lastPasswordChange}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Session Timeout</h3>
                          <p className="text-sm text-muted-foreground">
                            Your session will expire after {user.securitySettings.sessionTimeout} of inactivity
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Login Attempts</h3>
                          <p className="text-sm text-muted-foreground">
                            Your account will be locked after {user.securitySettings.loginAttempts} failed login
                            attempts
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

