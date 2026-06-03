import {
    BookOpen,
    ChevronDown,
    CircleGauge,
    LogOut,
    Moon, PencilRuler,
    Settings as SettingsIcon,
    Sun,
    UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useTheme } from "@/components/theme/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AppLogo from "@/assets/studyblocks-icon.svg";
import AppLogoWhite from "@/assets/studyblocks-icon-white.svg";
import Settings from "@/settings/main.json";

export default function HeaderLayout() {
    const { theme, toggleTheme } = useTheme();

    const logo = theme === "dark" ? AppLogoWhite : AppLogo;

    return (
        <header className="border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <div className="mx-auto flex h-16 items-center justify-between px-6">
                <Link
                    to="/"
                    className="flex items-center gap-2 font-semibold text-foreground"
                >
                    <img
                        src={logo}
                        alt={`${Settings.appname} logo`}
                        className="h-9 w-auto"
                    />

                    <span>{Settings.appname}</span>
                </Link>

                <div className="flex items-center rounded-full border border-border bg-card p-1 shadow-sm">
                    {/* Account dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-9 gap-2 rounded-full px-2 pr-3 text-foreground hover:bg-accent hover:text-accent-foreground"
                                aria-label="Open account menu"
                            >
                                <Avatar className="size-9">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CG</AvatarFallback>
                                </Avatar>

                                <ChevronDown size={14} className="text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col">
                  <span className="font-medium text-popover-foreground">
                    Carlos Gonzalez
                  </span>
                                    <span className="text-xs font-normal text-muted-foreground">
                    Student account
                  </span>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link to="/account" className="cursor-pointer">
                                        <UserCircle size={16} />
                                        Account
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Link to="/documents/demo" className="cursor-pointer">
                                        <BookOpen size={16} />
                                        My study guides
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Link to="/progress" className="cursor-pointer">
                                        <CircleGauge size={16} />
                                        My progress
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                <LogOut size={16} />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="mx-1 h-5 w-px bg-border" />

                    {/* Settings dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-9 rounded-full text-foreground hover:bg-accent hover:text-accent-foreground"
                                aria-label="Open settings menu"
                            >
                                <SettingsIcon size={17} />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link to="/settings" className="cursor-pointer">
                                        <SettingsIcon size={16} />
                                        App settings
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={toggleTheme}
                                >
                                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                    {theme === "dark" ? "Light mode" : "Dark mode"}
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer">
                                    <PencilRuler size={16}/>
                                    Editor preferences
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}